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
                    Description = "Family planning for the Doe family",
                    Count = 4,
                };

                var group2 = new Group()
                {
                    Name = "SKK",
                    Description = "For me and my girlies",
                };

                var group3 = new Group()
                {
                    Name = "Swifties",
                    Description = "Meet me at midnight",
                };

                var group4 = new Group()
                {
                    Name = "AWs",
                    Description = "When can we meet for AWs?",
                };

                var group5 = new Group()
                {
                    Name = "Horror Nights",
                    Description = "Movie nights, when?",
                };

                var john = new User()
                {
                    FirstName = "John",
                    LastName = "Doe",
                    Email = "johndoe@mail.com",
                    Password = "johndoe",
                };

                var jane = new User()
                {
                    FirstName = "Jane",
                    LastName = "Doe",
                    Email = "janedoe@mail.com",
                    Password = "janedoe",
                };

                var mary = new User()
                {
                    FirstName = "Mary",
                    LastName = "Doe",
                    Email = "marydoe@mail.com",
                    Password = "marydoe",
                };

                var joseph = new User()
                {
                    FirstName = "Joseph",
                    LastName = "Doe",
                    Email = "josephdoe@mail.com",
                    Password = "josephdoe",
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
                        },
                    },
                    new UserGroup()
                    {
                        User = john,
                        Group = group1,
                    },
                    new UserGroup()
                    {
                        User = jane,
                        Group = group1,
                    },
                    new UserGroup()
                    {
                        User = jane,
                        Group = group2,
                    },
                    new UserGroup()
                    {
                        User = jane,
                        Group = group3,
                    },
                    new UserGroup()
                    {
                        User = jane,
                        Group = group4,
                    },
                    new UserGroup()
                    {
                        User = jane,
                        Group = group5,
                    },
                    new UserGroup()
                    {
                        User = mary,
                        Group = group1,
                    },
                    new UserGroup()
                    {
                        User = joseph,
                        Group = group1,
                    }
                };

                if(!dataContext.Events.Any())
                {
                    var events = new List<Event>()
                    {
                        new Event()
                        {
                            Title = "Dinner with Jane",
                            Start = DateTime.Now,
                            End = DateTime.Now,
                            Category = "Home",
                            User = john,
                        },
                        new Event()
                        {
                            Title = "Dinner with John",
                            Start = DateTime.Now,
                            End = DateTime.Now,
                            Category = "Home",
                            User = jane,
                        },
                        new Event()
                        {
                            Title = "Visit the dentist",
                            Start = DateTime.Now,
                            End = DateTime.Now,
                            Category = "Home",
                            User = jane,
                        },
                    };
                    dataContext.Events.AddRange(events);
                    dataContext.SaveChanges();
                }

                if (!dataContext.Tasks.Any())
                {
                    var tasks = new List<UserTask>()
                    {
                        new UserTask()
                        {
                            Title = "ICA - Milk",
                            Category = "Groceries",
                            IsCompleted = false,
                            User = jane,
                        },
                        new UserTask()
                        {
                            Title = "ICA - Eggs",
                            Category = "Groceries",
                            IsCompleted = false,
                            User = jane,
                        },
                        new UserTask()
                        {
                            Title = "ICA - Bread",
                            Category = "Groceries",
                            IsCompleted = false,
                            User = jane,
                        },
                        new UserTask()
                        {
                            Title = "ICA - Cheese",
                            Category = "Groceries",
                            IsCompleted = false,
                            User = jane,
                        },
                        new UserTask()
                        {
                            Title = "ICA - Butter",
                            Category = "Groceries",
                            IsCompleted = false,
                            User = jane,
                        },
                        new UserTask()
                        {
                            Title = "Willys - Chicken",
                            Category = "Groceries",
                            IsCompleted = false,
                            User = jane,
                        },
                        new UserTask()
                        {
                            Title = "Willys - Beef",
                            Category = "Groceries",
                            IsCompleted = false,
                            User = jane,
                        },
                        new UserTask()
                        {
                            Title = "Willys - Pork",
                            Category = "Groceries",
                            IsCompleted = false,
                            User = jane,
                        },
                        new UserTask()
                        {
                            Title = "Hemköp - Toilet papers",
                            Category = "Groceries",
                            IsCompleted = true,
                            User = jane,
                        },
                    };
                    dataContext.Tasks.AddRange(tasks);
                    dataContext.SaveChanges();
                }
                dataContext.UserGroups.AddRange(userGroups);
                dataContext.SaveChanges();
            }
        }
    }
}