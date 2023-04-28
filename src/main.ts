import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.directive('draggable', {
  mounted: (el:HTMLElement) => {
    el.style.position = 'absolute';
    el.style.cursor = 'move';
    el.style.zIndex = '1000';
    el.setAttribute('data-draggable', 'true');

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    el.onmousedown = (e:MouseEvent) => {
      e.preventDefault();
      if(!e.target) return;
      const closestDraggable = e.target.closest('[data-draggable]');
      if (closestDraggable === el) {
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }
    }
    const elementDrag = (e:MouseEvent) => {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      el.style.top = (el.offsetTop - pos2) + 'px';
      el.style.left = (el.offsetLeft - pos1) + 'px';
    }
    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    }
    // ANOTHER USEFUL FUNCTION WOULD BE TO PREVENT THE ELEMENT FROM BEING DRAGGED OUTSIDE OF THE WINDOW
  },
  unmounted: (el:HTMLElement) => {
    el.onmousedown = null;
  }
})
app.mount('#app')