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

        // GET: api/Groups
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Group>))]
        public IActionResult GetGroups()
        {
            var group = _mapper.Map<List<GroupDto>>(_groupRepository.GetGroups());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(group);
        }

        // GET: api/Groups/5
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
