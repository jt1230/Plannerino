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
        private readonly IMapper _mapper;

        public UserTaskController(IUserTaskRepository userTaskRepository, IMapper mapper)
        {
            _userTaskRepository = userTaskRepository;
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
        public IActionResult GetUserTaskByCategory(string category)
        {
            var userTask = _mapper.Map<List<UserTaskDto>>(_userTaskRepository.GetUserTaskByCategory(category));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(userTask);
        }

        // GET: api/UserTask/userId
        [HttpGet("{userId:int}")]
        [ProducesResponseType(200, Type = typeof(Event))]
        [ProducesResponseType(400)]
        public IActionResult GetUserTaskByUser(int userId)
        {

            var userTask = _mapper.Map<List<UserTaskDto>>(_userTaskRepository.GetUserTaskByUser(userId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(userTask);
        }

        //// POST api/Groups
        //[HttpPost]
        //public async Task<IActionResult> Post(Group group)
        //{
        //    await dbContext.Groups.AddAsync(group);
        //    await dbContext.SaveChangesAsync();
        //    return Ok(group);
        //}

        //PUT api/Groups/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> Put(int id, Group groupToBeUpdated)
        //{
        //    var findGroup = await dbContext.Groups.FindAsync(id);

        //    if (findGroup != null)
        //    {
        //        findGroup.Name = groupToBeUpdated.Name;
        //        findGroup.Description = groupToBeUpdated.Description;
        //        findGroup.Users = groupToBeUpdated.Users;

        //        await dbContext.SaveChangesAsync();
        //        return Ok(findGroup);
        //    }
        //    return NotFound();
        //}

        //// DELETE api/Groups/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(int id)
        //{
        //    var group = await dbContext.Groups.FindAsync(id);

        //    if (group != null)
        //    {
        //        dbContext.Remove(group);
        //        await dbContext.SaveChangesAsync();
        //        return Ok(group);
        //    }
        //    return NotFound();
        //}
    }
}
