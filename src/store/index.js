import { INITIAL_CARDS_COUNT } from '../constants/index.js';
import { courses as allCourses } from '../courses.js';

const state = {
  allCourses: Object.freeze(allCourses),
  selectedCat: 'all',
  searchQuery: '',
  visibleCardsCount: INITIAL_CARDS_COUNT,

  get queryCourses() {
    return this.allCourses.filter(
      (course) =>
        this.searchQuery === '' ||
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.author.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  },
  get catQueryCourses() {
    return this.queryCourses.filter(
      (course) => this.selectedCat === 'all' || course.cat === this.selectedCat
    );
  },
  get visibleCourses() {
    return this.catQueryCourses.slice(0, this.visibleCardsCount);
  },
  get catStats() {
    const catStats = this.queryCourses.reduce((acc, course) => {
      acc[course.cat] = (acc[course.cat] || 0) + 1;
      return acc;
    }, {});
    catStats['all'] = this.queryCourses.length;
    return catStats;
  },
};

const subscribers = [];

function setState(newState) {
  Object.assign(state, newState);
  subscribers.forEach((callback) => callback(state));
}

function subscribe(callback) {
  subscribers.push(callback);
}

export { state, setState, subscribe };
