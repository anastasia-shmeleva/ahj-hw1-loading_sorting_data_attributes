/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
import * as data from '../../data.json';

export default class Table {
  constructor(container) {
    this.container = document.querySelector(container);
  }

  render() {
    for (const elem of data.films) {
      const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
      });
      const imdb = formatter.format(`${elem.imdb}`);
      this.container.querySelector('tbody').insertAdjacentHTML('beforeend', `<tr data-id="${elem.id}" data-title="${elem.title}" data-year="${elem.year}" data-imdb="${elem.imdb}">
      <td>${elem.id}</td>
      <td>${elem.title}</td>
      <td>(${elem.year})</td>
      <td>imdb:${imdb}</td>
      </tr>`);
    }
  }

  sort() {
    document.addEventListener('DOMContentLoaded', () => {
      const getSort = (target) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
          a.children[index].innerHTML,
          b.children[index].innerHTML,
        );

        for (const tBody of target.closest('table').tBodies) tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for (const cell of target.parentNode.cells) cell.classList.toggle('sorted', cell === target);
      };

      // сортировка по клику / change target for { target }
      document.querySelectorAll('.container thead').forEach((tableTH) => tableTH.addEventListener('click', (event) => getSort(event)));

      // сортировка интервалом
      const elems = document.querySelectorAll('.container thead')[0].querySelectorAll('th');
      const elem0 = elems[0];
      const elem1 = elems[1];
      const elem2 = elems[2];
      const elem3 = elems[3];

      function delay(n) {
        return new Promise((resolve) => {
          setTimeout(resolve, n * 1000);
        });
      }

      async function myAsyncFunction() {
        getSort(elem0);

        await delay(2);

        getSort(elem0);

        await delay(2);

        getSort(elem1);

        await delay(2);

        getSort(elem1);

        await delay(2);

        getSort(elem2);

        await delay(2);

        getSort(elem2);

        await delay(2);

        getSort(elem3);

        await delay(2);

        getSort(elem3);

        await delay(2);

        myAsyncFunction();
      }

      myAsyncFunction();
    });
  }
}

window.Table = Table;
