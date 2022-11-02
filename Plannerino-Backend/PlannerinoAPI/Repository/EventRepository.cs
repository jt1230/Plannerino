using PlannerinoAPI.Data;
using PlannerinoAPI.Interfaces;
using PlannerinoAPI.Models;

namespace PlannerinoAPI.Repository
{
    public class EventRepository : IEventRepository
    {
        private readonly PlannerinoContext _context;

        public EventRepository(PlannerinoContext context)
        {
            _context = context;
        }
        public ICollection<Event> GetEvents()
        {
            return _context.Events.OrderBy(e => e.Id).ToList();
        }

        public Event GetEvent(int id)
        {
            return _context.Events.First(e => e.Id == id);
        }

        public Event GetEventByType(string type)
        {
            return _context.Events.First(e => e.Type == type);
        }

        public Event GetEventByUser(int userId)
        {
            return _context.Events.First(e => e.User.Id == userId);
        }

        public bool EventExists(int id)
        {
            return _context.Events.Any(e => e.Id == id);
        }
    }    
}
