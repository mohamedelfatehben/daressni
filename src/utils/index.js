export const specialties = {
  Moy_1: "1st Year Middle School",
  Moy_2: "2nd Year Middle School",
  Moy_3: "3rd Year Middle School",
  Moy_4: "4th Year Middle School",
  Science_1: "1st Year High School Science",
  Let_1: "1st Year High School Literature",
  Lang_2: "2nd Year High School Languages",
  Philo_2: "2nd Year High School Philosophy",
  Math_2: "2nd Year High School Mathematics",
  MT_2: "2nd Year High School Technical Mathematics",
  Gets_2: "2nd Year High School Management",
  Science_2: "2nd Year High School Science",
  Lang_3: "3rd Year High School Languages",
  Philo_3: "3rd Year High School Philosophy",
  Math_3: "3rd Year High School Mathematics",
  MT_3: "3rd Year High School Technical Mathematics",
  Gets_3: "3rd Year High School Management",
  Science_3: "3rd Year High School Science",
};


export function timeAgo(timestamp) {
  if (!timestamp) {
    return "Unknown"; // or any default value or appropriate handling
  } else {
    const currentDate = new Date();
    const postDate = new Date(timestamp);

    const timeDifference = currentDate.getTime() - postDate.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }
}
