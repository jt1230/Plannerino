using PlannerinoAPI.Models;

namespace PlannerinoAPI.Interfaces
{
    public interface IEventRepository
    {
        ICollection<Event> GetEvents();
        Event GetEvent(int id);
        Event GetEventByType(string type);
        Event GetEventByUser(int userId);
        bool EventExists(int id);
        
    }
}
