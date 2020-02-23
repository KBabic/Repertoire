export const getShortText = (txt, num) => {
    if (txt && txt.length > num) {
        return txt.slice(0, num + 1) + "..."
    } else {
        return txt
    }
}
export const getJustifyContent = (val1, val2) => {
    if (!val1) {
        return "flex-end"
    }
    if (!val2) {
        return "flex-start"
    }
    return "space-between"
}
export const filterByGenre = (arr, id) => {
  const filtered = arr.filter(el => el.genre_ids.includes(id))
  return [...filtered]
}

export const genres = [
    {
      id: 777,
      name: "All"
    },
    {
      id: 888,
      name: "Favorites"
    },
    {
      id: 28,
      name: "Action"
    },
    {
      id: 12,
      name: "Adventure"
    },
    {
      id: 16,
      name: "Animation"
    },
    {
      id: 35,
      name: "Comedy"
    },
    {
      id: 80,
      name: "Crime"
    },
    {
      id: 99,
      name: "Documentary"
    },
    {
      id: 18,
      name: "Drama"
    },
    {
      id: 10751,
      name: "Family"
    },
    {
      id: 14,
      name: "Fantasy"
    },
    {
      id: 36,
      name: "History"
    },
    {
      id: 27,
      name: "Horror"
    },
    {
      id: 10402,
      name: "Music"
    },
    {
      id: 9648,
      name: "Mystery"
    },
    {
      id: 10749,
      name: "Romance"
    },
    {
      id: 878,
      name: "Science Fiction"
    },
    {
      id: 10770,
      name: "TV Movie"
    },
    {
      id: 53,
      name: "Thriller"
    },
    {
      id: 10752,
      name: "War"
    },
    {
      id: 37,
      name: "Western"
    }
]