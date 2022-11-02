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

        // GET: api/Users
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<User>))]
        public IActionResult GetUsers()
        {
            var users = _mapper.Map<List<UserDto>>(_userRepository.GetUsers());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(users);
        }

        // GET: api/Users/5
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

        // GET api/Users/mail
        [HttpGet("{mail}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetUserByMail(string mail)
        {
            var user = _mapper.Map<UserDto>(_userRepository.GetUserByEmail(mail));
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
            var user = _userRepository.GetUserByEmailAndPwd(mail, pwd);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(user);
        }

        //// POST api/Users
        //[HttpPost]
        //public async Task<IActionResult> Post(User user)
        //{
        //    //user.Events = new List<Event>();
        //    //user.Groups = new List<Group>();
        //    //user.Tasks = new List<UserTask>();

        //    await dbContext.Users.AddAsync(user);
        //    await dbContext.SaveChangesAsync();
        //    return Ok(user);

        //}

        //// PUT api/Users/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> Put(int id, User userToBeUpdated)
        //{
        //    var findUser = await dbContext.Users.FindAsync(id);

        //    if(findUser != null)
        //    {
        //        findUser.FirstName = userToBeUpdated.FirstName;
        //        findUser.LastName = userToBeUpdated.LastName;
        //        findUser.Email = userToBeUpdated.Email;
        //        findUser.Password = userToBeUpdated.Password;

        //        await dbContext.SaveChangesAsync();
        //        return Ok(findUser);
        //    }
        //    return NotFound();
        //}

        //// DELETE api/Users/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(int id)
        //{
        //    var user = await dbContext.Users.FindAsync(id);

        //    if (user != null)
        //    {
        //        dbContext.Remove(user);
        //        await dbContext.SaveChangesAsync();
        //        return Ok(user);
        //    }
        //    return NotFound();
        //}
    }
}
