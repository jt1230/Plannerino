using PlannerinoAPI.Models;

namespace PlannerinoAPI.Interfaces
{
    public interface IGroupRepository
    {
        ICollection<Group> GetGroups();
        Group GetGroup(int id);
        bool GroupExists(int id);
        
    }
}
