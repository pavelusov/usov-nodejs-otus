import { directoryWalker } from './directoryWalker';
import { IElement } from "../interfaces";

jest.mock('fs');

describe('The "directoryWalker" utility', () => {
  const MOCK_FILE_INFO = {
    '/path/to/file1.txt': '100 200 300',
    '/path/to/file2.txt': '340 440 540',
  };

  let queue: IElement[];

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILE_INFO);
    queue = [];
  });

  it('should show that the folder contains 2 files', () => {
    directoryWalker({
      searchPath: '/path/to',
      depth: 1,
      maxDepth: 1,
      depthArg: '-d',
      queue: queue
    });
    expect(queue.length).toBe(2);
  });
});
