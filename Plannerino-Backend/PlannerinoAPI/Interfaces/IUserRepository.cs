﻿using PlannerinoAPI.Models;

namespace PlannerinoAPI.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetUsers();
        User GetUser(int id);
        User GetUserByEmail(string email);
        User GetUserByEmailAndPwd(string email, string pwd);
        ICollection<Group> GetGroupsFromAUser(int userId);
        ICollection<Event> GetEventsFromAUser(int userId);
        ICollection<UserTask> GetTasksFromAUser(int userId);
        bool UserExists(int id);
        bool CreateUser(User user);
        bool Save();

    }
}
