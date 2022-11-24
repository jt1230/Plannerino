using PlannerinoAPI.Models;

namespace PlannerinoAPI.Interfaces
{
    public interface IEventRepository
    {
        ICollection<Event> GetEvents();
        Event GetEvent(int id);
        bool EventExists(int id);
        bool CreateEvent(Event userEvent);
        bool UpdateEvent(Event userEvent);
        bool DeleteEvent(Event userEvent);
        bool Save();

    }
}
