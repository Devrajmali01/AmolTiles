import { RoomScene } from '../types';

export const ROOM_SCENES: RoomScene[] = [
  {
    id: 'room-living-01',
    name: 'Modern Living Room Foyer Floor',
    roomType: 'Living Room',
    defaultFloorTileId: 'marbito-gvt-17',
    defaultWallTileId: 'signova-carving-18',
    defaultFeatureWallTileId: 'tile-calacatta-03',
    baseRoomImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80'
  },
  {
    id: 'room-bath-02',
    name: 'Contemporary Spa Bathroom Suite',
    roomType: 'Bathroom',
    defaultFloorTileId: 'wellnato-wall-20',
    defaultWallTileId: 'tile-wall-fluted-06',
    defaultFeatureWallTileId: 'tile-statuario-01',
    baseRoomImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=80'
  },
  {
    id: 'room-kitchen-03',
    name: 'Gourmet Kitchen Island & Counter (3rd Room)',
    roomType: 'Kitchen & Dining',
    defaultFloorTileId: 'granite-z-black-12',
    defaultWallTileId: 'warmora-floor-19',
    defaultFeatureWallTileId: 'eureka-sink-23',
    baseRoomImage: '/src/assets/images/black_marble_living_room_1786558171845.jpg'
  },
  {
    id: 'room-outdoor-04',
    name: 'Main Entrance Hall & Stairway Floor',
    roomType: 'Entrance & Hallway',
    defaultFloorTileId: 'granite-lakha-red-16',
    defaultWallTileId: 'granite-silvassa-red-15',
    baseRoomImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80'
  }
];

