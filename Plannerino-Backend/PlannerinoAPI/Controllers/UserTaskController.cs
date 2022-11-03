using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PlannerinoAPI.Dto;
using PlannerinoAPI.Interfaces;
using PlannerinoAPI.Models;

namespace PlannerinoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserTaskController : ControllerBase
    {
        private readonly IUserTaskRepository _userTaskRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserTaskController(IUserTaskRepository userTaskRepository, IUserRepository userRepository, IMapper mapper)
        {
            _userTaskRepository = userTaskRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        // GET: api/UserTask
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UserTask>))]
        public IActionResult GetUserTasks()
        {
            var userTasks = _mapper.Map<List<UserTaskDto>>(_userTaskRepository.GetUserTasks());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(userTasks);
        }

        // GET: api/UserTask/5
        [HttpGet("{id:int}")]
        [ProducesResponseType(200, Type = typeof(UserTask))]
        [ProducesResponseType(400)]
        public IActionResult GetGroup(int id)
        {
            if (!_userTaskRepository.UserTaskExists(id))
            {
                return NotFound();
            }
            
            var userTask = _mapper.Map<List<UserTaskDto>>(_userTaskRepository.GetUserTask(id));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(userTask);
        }

        // GET: api/UserTask/category
        [HttpGet("{category}")]
        [ProducesResponseType(200, Type = typeof(UserTask))]
        [ProducesResponseType(400)]
        public IActionResult GetUserTasksByCategory(string category)
        {
            var userTask = _mapper.Map<List<UserTaskDto>>(_userTaskRepository.GetUserTasksByCategory(category));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(userTask);
        }

        // POST: api/UserTask
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(Event))]
        [ProducesResponseType(400)]
        public IActionResult CreateUserTask([FromQuery] int userId, [FromBody] UserTaskDto userTaskCreate)
        {
            if (userTaskCreate == null)
            {
                return BadRequest(ModelState);
            }

            var userTask = _userTaskRepository.GetUserTasks().FirstOrDefault(u => string.Equals(u.Title, userTaskCreate.Title, StringComparison.OrdinalIgnoreCase));
            if (userTask != null)
            {
                ModelState.AddModelError("", "Event already exists!");
                return StatusCode(404, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var userTaskToCreate = _mapper.Map<UserTask>(userTaskCreate);

            userTaskToCreate.User = _userRepository.GetUser(userId);

            if (!_userTaskRepository.CreateUserTask(userTaskToCreate))
            {
                ModelState.AddModelError("", $"Something went wrong saving the task {userTaskToCreate.Title}");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }

        //PUT: api/UserTask
        [HttpPut("{userTaskId:int}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult UpdateUserTask(int userTaskId, [FromBody] UserTaskDto updatedUserTask)
        {
            if (updatedUserTask == null || userTaskId != updatedUserTask.Id)
            {
                return BadRequest(ModelState);
            }

            if (!_userTaskRepository.UserTaskExists(userTaskId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userTaskToUpdate = _mapper.Map<UserTask>(updatedUserTask);

            if (!_userTaskRepository.UpdateUserTask(userTaskToUpdate))
            {
                ModelState.AddModelError("", "Something went wrong updating the task");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully updated");
        }

        //DELETE: api/UserTask
        [HttpDelete("{userTaskId:int}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult DeleteUserTask(int userTaskId)
        {
            if (!_userTaskRepository.UserTaskExists(userTaskId))
            {
                return NotFound();
            }

            var userTaskToDelete = _userTaskRepository.GetUserTask(userTaskId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_userTaskRepository.DeleteUserTask(userTaskToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting the task");
                return StatusCode(500, ModelState);
            }
            return Ok("Successfully deleted");
        }

    }
}
