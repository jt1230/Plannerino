using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PlannerinoAPI.Dto;
using PlannerinoAPI.Interfaces;
using PlannerinoAPI.Models;

namespace PlannerinoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IMapper _mapper;

        public GroupController(IGroupRepository groupRepository, IMapper mapper)
        {
            _groupRepository = groupRepository;
            _mapper = mapper;
        }

        // GET: api/Group
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Group>))]
        public IActionResult GetGroups()
        {
            var group = _mapper.Map<List<GroupDto>>(_groupRepository.GetGroups());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(group);
        }

        // GET: api/Group/5
        [HttpGet("{id:int}")]
        [ProducesResponseType(200, Type = typeof(Group))]
        [ProducesResponseType(400)]
        public IActionResult GetGroup(int id)
        {
            if (!_groupRepository.GroupExists(id))
            {
                return NotFound();
            }
            
            var group = _mapper.Map<UserDto>(_groupRepository.GetGroup(id));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(group);
        }

        // GET api/Group/2/users
        [HttpGet("{groupId:int}/users")]
        [ProducesResponseType(200, Type = typeof(Group))]
        [ProducesResponseType(400)]
        public IActionResult GetUsersFromAGroup(int groupId)
        {
            if (!_groupRepository.GroupExists(groupId))
            {
                return NotFound();
            }

            var user = _mapper.Map<List<UserDto>>(_groupRepository.GetUsersFromAGroup(groupId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(user);
        }

        // POST: api/Group
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(Group))]
        [ProducesResponseType(400)]
        public IActionResult CreateCategory([FromBody] GroupDto groupCreate)
        {
            if (groupCreate == null)
            {
                return BadRequest(ModelState);
            }
            
            var group = _groupRepository.GetGroups().FirstOrDefault(u => string.Equals(u.Name, groupCreate.Name, StringComparison.OrdinalIgnoreCase));
            if (group != null)
            {
                ModelState.AddModelError("", "Group already exists!");
                return StatusCode(404, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var groupToCreate = _mapper.Map<Group>(groupCreate);
            
            if (!_groupRepository.CreateGroup(groupToCreate))
            {
                ModelState.AddModelError("", $"Something went wrong saving the group {groupToCreate.Name}");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
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
