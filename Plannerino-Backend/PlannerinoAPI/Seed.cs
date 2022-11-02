using System.Text.Json;
using PlannerinoAPI.Data;
using PlannerinoAPI.Models;

namespace PlannerinoAPI
{
    public class Seed
    {
        private readonly PlannerinoContext dataContext;

        public Seed(PlannerinoContext context)
        {
            this.dataContext = context;
        }
        /// <summary>
        /// Seeds the database with some data
        /// </summary>
        public void SeedDB()
        {
            
            if (!dataContext.UserGroups.Any())
            {
                var group1 = new Group()
                {
                    Name = "The Doe's",
                    Description = "Family planning for the Doe family"
                };

                var userGroups = new List<UserGroup>()
                {
                    new UserGroup()
                    {
                        User = new User()
                        {
                            FirstName = "admin",
                            LastName = "admin",
                            Email = "admin",
                            Password = "admin",
                            IsAdmin = true,
                        },
                    },
                    new UserGroup()
                    {
                        User = new User()
                        {   
                            FirstName = "John",
                            LastName = "Doe",
                            Email = "johndoe@mail.com",
                            Password = "johndoe",
                            IsAdmin = false,
                        },
                        Group = group1,
                    },
                    new UserGroup()
                    {
                        User = new User()
                        {
                            FirstName = "Jane",
                            LastName = "Doe",
                            Email = "janedoe@mail.com",
                            Password = "janedoe",
                            IsAdmin = false,
                        },
                        Group = group1,
                    },
                    new UserGroup()
                    {
                        User = new User()
                        {
                            FirstName = "Mary",
                            LastName = "Doe",
                            Email = "marydoe@mail.com",
                            Password = "marydoe",
                            IsAdmin = false,
                        },
                        Group = group1,
                    },
                    new UserGroup()
                    {
                        User = new User()
                        {
                            FirstName = "Joseph",
                            LastName = "Doe",
                            Email = "josephdoe@mail.com",
                            Password = "josephdoe",
                            IsAdmin = false,
                        },
                        Group = group1,
                    }
                };
                dataContext.UserGroups.AddRange(userGroups);
                dataContext.SaveChanges();
            }
        }
    }
}