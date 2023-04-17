import { ImageNotFoundPipe } from './image-not-found.pipe';

describe('ImageNotFoundPipe', () => {
  it('create an instance', () => {
    const pipe = new ImageNotFoundPipe();
    expect(pipe).toBeTruthy();
  });
  it(`it returns default image if string doesn't start with "http"`, () => {
    const pipe = new ImageNotFoundPipe();
    expect(pipe.transform('any string')).toBe('/assets/image-not-found.png');
  });
  it(`it returns same text if string starts with "http"`, () => {
    const pipe = new ImageNotFoundPipe();
    expect(pipe.transform('http whatever')).toBe('http whatever');
  });
});
