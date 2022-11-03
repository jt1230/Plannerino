using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PlannerinoAPI.Dto;
using PlannerinoAPI.Interfaces;
using PlannerinoAPI.Models;

namespace PlannerinoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public EventController(IEventRepository eventRepository, IUserRepository userRepository, IMapper mapper)
        {
            _eventRepository = eventRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        // GET: api/Event
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Event>))]
        public IActionResult GetEvents()
        {
            var events = _mapper.Map<List<EventDto>>(_eventRepository.GetEvents());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(events);
        }

        // GET: api/Event/5
        [HttpGet("{id:int}")]
        [ProducesResponseType(200, Type = typeof(Event))]
        [ProducesResponseType(400)]
        public IActionResult GetEvent(int id)
        {
            if (!_eventRepository.EventExists(id))
            {
                return NotFound();
            }
            
            var userEvent = _mapper.Map<EventDto>(_eventRepository.GetEvent(id));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(userEvent);
        }

        // GET: api/Event/type
        [HttpGet("{type}")]
        [ProducesResponseType(200, Type = typeof(Event))]
        [ProducesResponseType(400)]
        public IActionResult GetEventByType(string type)
        {
            
            var eventType = _mapper.Map<EventDto>(_eventRepository.GetEventByType(type));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(eventType);
        }

        // GET: api/Event/userId/user
        [HttpGet("{userId:int}/user")]
        [ProducesResponseType(200, Type = typeof(Event))]
        [ProducesResponseType(400)]
        public IActionResult GetEventByUser(int userId)
        {

            var userEvent = _mapper.Map<EventDto>(_eventRepository.GetEventByUser(userId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(userEvent);
        }

        // POST: api/Event
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(Event))]
        [ProducesResponseType(400)]
        public IActionResult CreateCategory([FromQuery] int userId, [FromBody] EventDto eventCreate)
        {
            if (eventCreate == null)
            {
                return BadRequest(ModelState);
            }

            var userEvent = _eventRepository.GetEvents().FirstOrDefault(u => string.Equals(u.Title, eventCreate.Title, StringComparison.OrdinalIgnoreCase));
            if (userEvent != null)
            {
                ModelState.AddModelError("", "Group already exists!");
                return StatusCode(404, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var eventToCreate = _mapper.Map<Event>(eventCreate);

            eventToCreate.User = _userRepository.GetUser(userId);

            if (!_eventRepository.CreateEvent(eventToCreate))
            {
                ModelState.AddModelError("", $"Something went wrong saving the event {eventToCreate.Title}");
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
