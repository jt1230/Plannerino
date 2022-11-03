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
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public GroupController(IGroupRepository groupRepository, IUserRepository userRepository, IMapper mapper)
        {
            _groupRepository = groupRepository;
            _userRepository = userRepository;
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
        public IActionResult CreateGroup([FromQuery] int userId, [FromBody] GroupDto groupCreate)
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
            
            if (!_groupRepository.CreateGroup(userId, groupToCreate))
            {
                ModelState.AddModelError("", $"Something went wrong saving the group {groupToCreate.Name}");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }

        //PUT: api/Group
        [HttpPut("{groupId:int}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult UpdateGroup(int groupId, [FromBody] GroupDto updatedGroup)
        {
            if (updatedGroup == null || groupId != updatedGroup.Id)
            {
                return BadRequest(ModelState);
            }

            if (!_groupRepository.GroupExists(groupId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var groupToUpdate = _mapper.Map<Group>(updatedGroup);

            if (!_groupRepository.UpdateGroup(groupToUpdate))
            {
                ModelState.AddModelError("", "Something went wrong updating the group");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully updated");

        }

        //DELETE: api/Group
        [HttpDelete("{groupId:int}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult DeleteGroup(int groupId)
        {
            if (!_groupRepository.GroupExists(groupId))
            {
                return NotFound();
            }

            var eventToDelete = _groupRepository.GetGroup(groupId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_groupRepository.DeleteGroup(eventToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting the group");
                return StatusCode(500, ModelState);
            }
            return Ok("Successfully deleted");
        }
    }
}
