import jetPaths from 'jet-paths';

const Paths = {
  _: '/api',
  Samples: {
    _: '/samples',
    Get: '/all',
    GetOne: '/:id',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Clips: {
    _: '/samples',
    Get: '/all',
    GetOne: '/:id',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;

export const JetPaths = jetPaths(Paths);
export default Paths;
