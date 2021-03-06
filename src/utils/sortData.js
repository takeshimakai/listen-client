const sortData = (sortBy, data) => {
  switch (sortBy) {
    case 'oldest':
      return data.sort((a, b) => new Date(a.datePosted) - new Date(b.datePosted));
    case 'newest':
      return data.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
    case 'oldest edit':
      return data.sort((a, b) => {
        if (!a.dateEdited) return 1;
        if (!b.dateEdited) return -1;
        return new Date(a.dateEdited) - new Date(b.dateEdited)
      });
    case 'newest edit':
      return data.sort((a, b) => {
        if (!a.dateEdited) return 1;
        if (!b.dateEdited) return -1;
        return new Date(b.dateEdited) - new Date(a.dateEdited)
      });
    case 'least relatable':
      return data.sort((a, b) => a.relatable.length - b.relatable.length);
    case 'most relatable':
      return data.sort((a, b) => b.relatable.length - a.relatable.length);
    default:
      return;
  }
}

export default sortData;