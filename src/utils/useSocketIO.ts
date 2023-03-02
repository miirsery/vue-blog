export const useSocketIO = () => {
  const socket = io('ws://localhost:3000')
  return {
    socket,
  }
}
