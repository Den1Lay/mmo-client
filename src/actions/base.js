export const makeSlide = (pass) => ({
  type: 'MAKE_SLIDE',
  payload: pass
})

export const overMakeSlide = () => ({
  type: 'OVER_MAKE_SLIDE'
})

export const registControl = (pass) => ({
  type: 'REGISTER_CONTROL',
  payload: pass
})