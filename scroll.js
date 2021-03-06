/**
 * @param {Object} options
 * @param {Boolean} options.scrollX
 * @param {Boolean} options.scrollY
 * @param {String} options.pointer.holding
 * @param {String} options.pointer.hover
 */
export const useDragScroll = (options = {}) => {
  const config = {
    speed: 1.5,
    scrollX: true,
    scrollY: true,
    ...options,
    pointer: {
      holding: 'grabbing',
      default: 'grab',
      ...options.pointer,
    },
  };

  return {
    onLoad: (event) => {
      if (config.pointer.default) {
        event.currentTarget.style.cursor = config.pointer.default;
      }
    },
    onMouseDown: (event) => {
      if (config.pointer.holding) {
        event.currentTarget.style.cursor = config.pointer.holding;
      }

      event.currentTarget.dataset.isDown = true;

      // Posição inicial X
      event.currentTarget.dataset.startX =
        event.pageX - event.currentTarget.offsetLeft;

      // Posição inicial Y
      event.currentTarget.dataset.startY =
        event.pageY - event.currentTarget.scrollTop;

      // scroll X inicial
      event.currentTarget.dataset.scrollLeft = event.currentTarget.scrollLeft;

      // scroll Y inicial
      event.currentTarget.dataset.scrollTop = event.currentTarget.scrollTop;
    },
    onMouseLeave: (event) => {
      if (config.pointer.default) {
        event.currentTarget.style.cursor = config.pointer.default;
      }

      event.currentTarget.dataset.isDown = false;
    },
    onMouseUp: (event) => {
      if (config.pointer.default) {
        event.currentTarget.style.cursor = config.pointer.default;
      }

      event.currentTarget.dataset.isDown = false;
    },
    onMouseMove: (event) => {
      const isDown = event.currentTarget.dataset.isDown;

      if (!isDown || isDown === 'false') {
        return;
      }

      event.preventDefault();

      const pageX = event.pageX - event.currentTarget.dataset.scrollLeft;
      const pageY = event.pageY - event.currentTarget.dataset.scrollTop;

      const walkX = (pageX - event.currentTarget.dataset.startX) * config.speed;
      const walkY = (pageY - event.currentTarget.dataset.startY) * config.speed;

      if (config.scrollX) {
        event.currentTarget.scrollLeft =
          event.currentTarget.dataset.scrollLeft - walkX;
      }

      if (config.scrollY) {
        event.currentTarget.scrollTop =
          event.currentTarget.dataset.scrollTop - walkY;
      }
    },
  };
};
