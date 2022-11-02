//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using PlannerinoAPI.Data;
//using PlannerinoAPI.Models;

//namespace PlannerinoAPI.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class UsersController : ControllerBase
//    {
//        private readonly PlannerinoContext dbContext;

//        public UsersController(PlannerinoContext dbContext)
//        {
//            this.dbContext = dbContext;
//        }
        
//        // GET: api/Users
//        [HttpGet]
//        public async Task<IActionResult> GetAllUsers()
//        {
//            return Ok(await dbContext.Users.ToListAsync());
//        }

//        // GET api/Users/name/pwd
//        [HttpGet("{mail}/{pwd}")]
//        public async Task<IActionResult> GetUser(string mail, string pwd)
//        {
//            var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == mail && u.Password == pwd);
//            if(user == null)
//            {
//                return NotFound();
//            }
//            return Ok(user);
//        }

//        // POST api/Users
//        [HttpPost]
//        public async Task<IActionResult> Post(User user)
//        {
//            //user.Events = new List<Event>();
//            //user.Groups = new List<Group>();
//            //user.Tasks = new List<UserTask>();

//            await dbContext.Users.AddAsync(user);
//            await dbContext.SaveChangesAsync();
//            return Ok(user);

//        }

//        // PUT api/Users/5
//        [HttpPut("{id}")]
//        public async Task<IActionResult> Put(int id, User userToBeUpdated)
//        {
//            var findUser = await dbContext.Users.FindAsync(id);

//            if(findUser != null)
//            {
//                findUser.FirstName = userToBeUpdated.FirstName;
//                findUser.LastName = userToBeUpdated.LastName;
//                findUser.Email = userToBeUpdated.Email;
//                findUser.Password = userToBeUpdated.Password;

//                await dbContext.SaveChangesAsync();
//                return Ok(findUser);
//            }
//            return NotFound();
//        }

//        // DELETE api/Users/5
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> Delete(int id)
//        {
//            var user = await dbContext.Users.FindAsync(id);

//            if (user != null)
//            {
//                dbContext.Remove(user);
//                await dbContext.SaveChangesAsync();
//                return Ok(user);
//            }
//            return NotFound();
//        }
//    }
//}
