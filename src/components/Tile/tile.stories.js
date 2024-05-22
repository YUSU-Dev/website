import Tile from "./tile.vue";

export default {
  title: "Components/Tile",
  component: Tile,
  parameters: {
    layout: "centered",
  }
};

export const Default = {
  args: {
    url: '/',
    title: 'Title',
    date: '2024-04-26T00:00:00.000Z',
    categories: [
        {
            "id": 37,
            "parent_id": 0,
            "name": "Representation",
            "url": "representation"
        },
        {
            "id": 39,
            "parent_id": 0,
            "name": "Officers",
            "url": "officers"
        },
        {
            "id": 54,
            "parent_id": 0,
            "name": "Union Elections",
            "url": "elections"
        },
        {
            "id": 55,
            "parent_id": 0,
            "name": "Single Students' Union",
            "url": "single-students-union"
        }
    ]
  }
};
