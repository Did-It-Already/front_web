export const deleteLocalStorage = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('theme');
};

export const changeBodyColor = (theme) => {
  var element = document.body
  if(theme === 'light'){
    element.className = 'lightBody'
  }else{
    element.className = 'darkBody'
  }
}

export const moveHeaderUp = () => {
    var element = document.getElementById('titleBoxId')
    if(element.className === 'titleBox'){
        element.classList.add("normal")
    }
}

export const moveHeaderDown = () => {
    var element = document.getElementById('titleBoxId')
    if(element.className === 'titleBox normal'){
        element.classList.remove("normal")
    }
}
  
export async function getUserInfo(token) {
  const graphqlQuery = `
    query {
      userById {
        name
        last_name
        email
        theme
        profile_picture
      }
    }
  `;

  try {
    const response = await fetch('http://127.0.0.1:5000/graphql/', {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({ query: graphqlQuery }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const user = data.data.userById;

    if (user) {
      return user; 
    } else {
      throw new Error('No user found.');
    }
  } catch (error) {
    throw error;
  }
}

export async function getHabits(token) {
  const graphqlQuery = `
    query {
      userHabits{
        name
        start_date
        description
        _id
        is_done
      }
    }
  `;

  try {
    const response = await fetch('http://127.0.0.1:5000/graphql/', {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({ query: graphqlQuery }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const habits = data.data.userHabits;

    if (habits) {
      return habits; 
    } else {
      throw new Error('No habits found.');
    }
  } catch (error) {
    throw error;
  }
}

export async function getTasks(token) {
  const graphqlQuery = `
    query {
      allTasks{
        _id
        name
        description
        date
        is_done
      }
    }
  `;

  try {
    const response = await fetch('http://127.0.0.1:5000/graphql/', {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({ query: graphqlQuery }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const tasks = data.data.allTasks;

    if (tasks) {
      return tasks; 
    } else {
      throw new Error('No tasks found.');
    }
  } catch (error) {
    throw error;
  }
}

// Gets the refresh token from the local storage
export const refreshToken = () => {
  return localStorage.getItem("refresh");
}

// Gets the access token from the local storage
export const accessToken = () => {
  return localStorage.getItem("access");
}

// Gets if the user is logged in
export const loggedInUser = () => {
  return (localStorage.getItem("refresh") && localStorage.getItem("access"))
}