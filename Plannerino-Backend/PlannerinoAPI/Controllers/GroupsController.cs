using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlannerinoAPI.Data;
using PlannerinoAPI.Models;

namespace PlannerinoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly PlannerinoContext dbContext;

        public GroupsController(PlannerinoContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/Groups
        [HttpGet]
        public async Task<IActionResult> GetAllGroups()
        {
            return Ok(await dbContext.Groups.ToListAsync());
        }

        // GET api/Groups/id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroup(int id)
        {
            var group = await dbContext.Groups.FindAsync(id);
            if (group == null)
            {
                return NotFound();
            }
            return Ok(group);
        }

        // GET api/Groups/Users/2
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetGroupMembers(int id)
        //{
        //    var userGroup = await dbContext.
        //    var group = await dbContext.Groups.FindAsync(id);
        //    if (group == null)
        //    {
        //        return NotFound();
        //    }
        //    else
        //    {
                
        //    }
        //    return Ok(group);
        //}

        // POST api/Groups
        [HttpPost]
        public async Task<IActionResult> Post(Group group)
        {
            await dbContext.Groups.AddAsync(group);
            await dbContext.SaveChangesAsync();
            return Ok(group);
        }

        // PUT api/Groups/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> Put(int id, Group groupToBeUpdated)
        //{
        //    var findGroup = await dbContext.Groups.FindAsync(id);

        //    if(findGroup != null)
        //    {
        //        findGroup.Name = groupToBeUpdated.Name;
        //        findGroup.Description = groupToBeUpdated.Description;
        //        findGroup.Users = groupToBeUpdated.Users;
                
        //        await dbContext.SaveChangesAsync();
        //        return Ok(findGroup);
        //    }
        //    return NotFound();
        //}

        // DELETE api/Groups/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var group = await dbContext.Groups.FindAsync(id);

            if (group != null)
            {
                dbContext.Remove(group);
                await dbContext.SaveChangesAsync();
                return Ok(group);
            }
            return NotFound();
        }
    }
}
