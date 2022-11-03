using PlannerinoAPI.Models;

namespace PlannerinoAPI.Interfaces
{
    public interface IGroupRepository
    {
        ICollection<Group> GetGroups();
        Group GetGroup(int id);
        ICollection<User> GetUsersFromAGroup(int groupId);
        bool GroupExists(int id);
        bool CreateGroup(int userId, Group group);
        bool UpdateGroup(Group group);
        bool DeleteGroup(Group group);
        bool Save();

    }
}
