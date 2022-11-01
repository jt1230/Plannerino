using EFDataAccessLibrary.Models;

namespace EFDataAccessLibrary.DataAccess
{
    public class Seeder
    {
        /// <summary>
        /// Seeds the database with some data
        /// </summary>
        public static void SeedDB()
        {
            using (var db = new PlannerinoContext())
            {
                db.Database.EnsureDeleted();
                db.Database.EnsureCreated();

                if (db.Users.Count() < 1)
                {
                    db.Users.AddRange(new List<User>
                    {
                        new User
                        {
                            Id = 1,
                            FirstName = "admin",
                            LastName = "admin",
                            Email = "admin",
                            Password = "admin",
                            IsAdmin = true,
                            Events = null,
                            Groups = null,
                            Tasks = null,
                        },
                        new User
                        {
                            Id = 2,
                            FirstName = "John",
                            LastName = "Doe",
                            Email = "john.doe@gmail.com",
                            Password = "johndoe",
                            IsAdmin = false,
                            Events = null,
                            Groups = null,
                            Tasks = null,
                        }, 
                        new User
                        {
                            Id = 3,
                            FirstName = "Mary",
                            LastName = "Doe",
                            Email = "mary.doe@gmail.com",
                            Password = "marydoe",
                            IsAdmin = false,
                            Events = null,
                            Groups = null,
                            Tasks = null,
                        }, 
                        new User
                        {
                            Id = 4,
                            FirstName = "Jane",
                            LastName = "Doe",
                            Email = "Jane.doe@gmail.com",
                            Password = "janedoe",
                            IsAdmin = false,
                            Events = null,
                            Groups = null,
                            Tasks = null,
                        } 
                    });
                    db.SaveChanges();
                }


                if (db.Groups.Count() < 1)
                {
                    var john = db.Users.FirstOrDefault(u => u.FirstName == "John");
                    var mary = db.Users.FirstOrDefault(u => u.FirstName == "Mary");
                    var jane = db.Users.FirstOrDefault(u => u.FirstName == "Jane");

                    db.Groups.AddRange(new List<Group>
                    {
                        new Group
                        {
                            Id = 1,
                            Name = "Family Doe",
                            Description = "Family Planner for the Doe family",
                            Users = new List<User>{john, mary, jane},
                            Creator = jane,
                        },
                    });
                }

                if (db.Tasks.Count() < 1)
                {
                    var jane = db.Users.FirstOrDefault(u => u.FirstName == "Jane");

                    db.Tasks.Add(new UserTask 
                    { 
                        Id = 1, 
                        Title = "ICA", 
                        Description = "Buy milk",
                        Category = "Grocery",
                        IsCompleted = false,
                        User = jane
                    });
                }

                if (db.Events.Count() < 1)
                {
                    var jane = db.Users.FirstOrDefault(u => u.FirstName == "Jane");

                    db.Events.Add(new Event
                    {
                        Id = 1,
                        Title = "Family Dinner",
                        Description = "Dinner's at Joe's",
                        StartDate = new DateTime(2022, 10, 29, 18, 00, 00),
                        EndDate = new DateTime(2022, 10, 29, 21, 30, 00),
                        Type = "Home",
                        User = jane
                    });
                }

            }
        }
    }
}