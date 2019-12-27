export const killer = ({dir}) => {
  return {
    type: 'MOVE',
    payload: dir
  }
}