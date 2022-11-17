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
        public IActionResult GetEventsByType(string type)
        {
            
            var eventType = _mapper.Map<List<EventDto>>(_eventRepository.GetEventsByType(type));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(eventType);
        }

        // POST: api/Event
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(Event))]
        [ProducesResponseType(400)]
        public IActionResult CreateEvent([FromQuery] int userId, [FromBody] EventDto eventCreate)
        {
            if (eventCreate == null)
            {
                return BadRequest(ModelState);
            }

            var userEvent = _eventRepository.GetEvents().FirstOrDefault(u => u.Id == eventCreate.Id);
            if (userEvent != null)
            {
                ModelState.AddModelError("", "Event already exists!");
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

        //PUT: api/Event
        [HttpPut("{eventId:int}/{userId:int}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult UpdateEvent(int eventId, int userId, [FromBody] EventDto updatedEvent)
        {
            if (updatedEvent == null || eventId != updatedEvent.Id)
            {
                return BadRequest(ModelState);
            }

            if (!_eventRepository.EventExists(eventId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var eventToUpdate = _mapper.Map<Event>(updatedEvent);

            eventToUpdate.User = _userRepository.GetUser(userId);

            if (!_eventRepository.UpdateEvent(eventToUpdate))
            {
                ModelState.AddModelError("", "Something went wrong updating the event");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully updated");
            
        }

        //DELETE: api/Event
        [HttpDelete("{eventId:int}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult DeleteEvent(int eventId)
        {
            if (!_eventRepository.EventExists(eventId))
            {
                return NotFound();
            }

            var eventToDelete = _eventRepository.GetEvent(eventId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_eventRepository.DeleteEvent(eventToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting the event");
                return StatusCode(500, ModelState);
            }
            return Ok("Successfully deleted");
        }


    }
}
