using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PlannerinoAPI.Dto;
using PlannerinoAPI.Interfaces;
using PlannerinoAPI.Models;

namespace PlannerinoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        // GET: api/User
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<User>))]
        public IActionResult GetUsers()
        {
            var users = _mapper.Map<List<UserDto>>(_userRepository.GetUsers());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(users);
        }

        // GET: api/User/5
        [HttpGet("{id:int}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetUser(int id)
        {
            if (!_userRepository.UserExists(id))
            {
                return NotFound();
            }

            var user = _mapper.Map<UserDto>(_userRepository.GetUser(id));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(user);
        }

        // GET api/Users/mail/pwd
        [HttpGet("{mail}/{pwd}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetUserByEmailAndPwd(string mail, string pwd)
        {
            var user = _mapper.Map<UserDto>(_userRepository.GetUserByEmailAndPwd(mail, pwd));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(user);
        }

        // GET api/Users/2/groups
        [HttpGet("{userId:int}/groups")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetGroupsFromAUser(int userId)
        {
            if (!_userRepository.UserExists(userId))
            {
                return NotFound();
            }

            var user = _mapper.Map<List<GroupDto>>(_userRepository.GetGroupsFromAUser(userId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(user);
        }

        // GET api/User/2/events
        [HttpGet("{userId:int}/events")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetEventsFromAUser(int userId)
        {
            if (!_userRepository.UserExists(userId))
            {
                return NotFound();
            }

            var user = _mapper.Map<List<EventDto>>(_userRepository.GetEventsFromAUser(userId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(user);
        }

        // GET api/User/2/tasks
        [HttpGet("{userId:int}/tasks")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetTasksFromAUser(int userId)
        {
            if (!_userRepository.UserExists(userId))
            {
                return NotFound();
            }

            var user = _mapper.Map<List<UserTaskDto>>(_userRepository.GetTasksFromAUser(userId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(user);
        }

        // POST: api/User
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult CreateCategory([FromQuery] int groupId, [FromBody] UserDto userCreate)
        {
            if (userCreate == null)
            {
                return BadRequest(ModelState);
            }

            var user = _userRepository.GetUsers().FirstOrDefault(u => string.Equals(u.Email, userCreate.Email, StringComparison.OrdinalIgnoreCase));
            if (user != null)
            {
                ModelState.AddModelError("", "User already exists!");
                return StatusCode(404, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userToCreate = _mapper.Map<User>(userCreate);

            if (!_userRepository.CreateUser(groupId, userToCreate))
            {
                ModelState.AddModelError("", $"Something went wrong saving the user {userToCreate.Email}");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully updated");
        }

        //PUT: api/User
        [HttpPut("{userId:int}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult UpdateUser(int userId, [FromBody] UserDto updatedUser) 
        {
            if (updatedUser == null || userId != updatedUser.Id)
            {
                return BadRequest(ModelState);
            }

            if (!_userRepository.UserExists(userId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userToUpdate = _mapper.Map<User>(updatedUser);

            if (!_userRepository.UpdateUser(userToUpdate))
            {
                ModelState.AddModelError("", "Something went wrong updating the user");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully updated");
        }

        //DELETE: api/User
        [HttpDelete("{userId:int}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult DeleteUser(int userId)
        {
            if (!_userRepository.UserExists(userId))
            {
                return NotFound();
            }

            var userToDelete = _userRepository.GetUser(userId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_userRepository.DeleteUser(userToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting the user");
                return StatusCode(500, ModelState);
            }
            return Ok("Successfully deleted");
        }
    }
}
