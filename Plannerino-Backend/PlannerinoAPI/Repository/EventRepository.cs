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
        public bool CreateEvent(Event userEvent)
        {
            _context.Add(userEvent);
            return Save();
        }
        public ICollection<Event> GetEvents()
        {
            return _context.Events.OrderBy(e => e.Id).ToList();
        }

        public Event GetEvent(int id)
        {
            return _context.Events.First(e => e.Id == id);
        }

        public ICollection<Event> GetEventsByType(string type)
        {
            return _context.Events.Where(e => e.Type == type).ToList();
        }

        public bool EventExists(int id)
        {
            return _context.Events.Any(e => e.Id == id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0;
        }

        public bool UpdateEvent(Event userEvent)
        {
            _context.Update(userEvent);
            return Save();
        }

        public bool DeleteEvent(Event userEvent)
        {
            _context.Remove(userEvent);
            return Save();
        }
    }    
}
