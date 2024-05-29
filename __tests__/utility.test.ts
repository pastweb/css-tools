import postcss from 'postcss';
import plugin from '../src';
import { generateHash } from '../src/utils';
import { Options } from '../src/types';

const getScope = (...args: string[]) => `_${generateHash(8, ...args)}`;

// Utility function to process CSS with the plugin
const processCSS = async (input: string, opts: Options = {}) => {
  const result = await postcss([plugin(opts)]).process(input, { from: undefined });
  return result.css;
};

describe('postcss-utility-modules - utility', () => {
  // it('should generate readable className utilies by default correctly', async () => {
  //   const input = `.class1 { color: red; background-color: white; .class2 { color: blue; } }`;

  //   const expectedOutput = `.color[_red] { color: red\n}\n.background-color[_white] { background-color: white\n}\n.color[_blue] { color: blue\n}`;
    
  //   let fileName: string = '';
  //   let cssModules: Record<string, string> = {};

  //   const getModules = jest.fn((filePath, modules) => {
  //     fileName = filePath;
  //     cssModules = modules;
  //   });

  //   const output = await processCSS(input, {
  //     getModules,
  //     utility: true,
  //   });
    
  //   expect(output).toBe(expectedOutput);
  //   expect(getModules).toHaveBeenCalledTimes(1);
  //   expect(fileName).toBe('unknown');
  //   expect(Object.keys(cssModules).length).toBe(2);
  //   expect(cssModules.class1).toBe('color[_red] background-color[_white]');
  //   expect(cssModules.class2).toBe('color[_blue]');
  // });

  // it('should generate readable className utilies by default correctly even in utilityModules', async () => {
  //   const input = `.class1 { color: red; background-color: white; .class2 { color: blue; } }`;

  //   const expectedOutput = `.color[_red] { color: red\n}\n.background-color[_white] { background-color: white\n}\n.color[_blue] { color: blue\n}`;
    
  //   let cssFileName: string = '';
  //   let cssModules: Record<string, string> = {};
  //   let utilityFileName: string = '';
  //   let utilityModules: Record<string, string> = {};

  //   const getModules = jest.fn((filePath, modules) => {
  //     cssFileName = filePath;
  //     cssModules = modules;
  //   });

  //   const getUtilityModules = jest.fn((filePath, modules) => {
  //     utilityFileName = filePath;
  //     utilityModules = modules;
  //   });

  //   const output = await processCSS(input, {
  //     getModules,
  //     utility: { getUtilityModules },
  //   });
    
  //   expect(output).toBe(expectedOutput);
  //   expect(getModules).toHaveBeenCalledTimes(1);
  //   expect(cssFileName).toBe('unknown');
  //   expect(Object.keys(cssModules).length).toBe(2);
  //   expect(cssModules.class1).toBe('color[_red] background-color[_white]');
  //   expect(cssModules.class2).toBe('color[_blue]');
  //   expect(getUtilityModules).toHaveBeenCalledTimes(1);
  //   expect(utilityFileName).toBe('unknown');
  //   expect(Object.keys(utilityModules).length).toBe(3);
  //   expect(utilityModules['color[_red]']).toBe('.color[_red] { color: red\n}');
  //   expect(utilityModules['background-color[_white]']).toBe('.background-color[_white] { background-color: white\n}');
  //   expect(utilityModules['color[_blue]']).toBe('.color[_blue] { color: blue\n}');
  // });

  // it('should generate semireadable className utilies correctly even in utilityModules', async () => {
  //   const input = `.class1 { color: red; background-color: white; .class2 { color: blue; } }`;

  //   const redId = getScope('red');
  //   const whiteId = getScope('white');
  //   const blueId = getScope('blue');

  //   const expectedOutput = `.color[${redId}] { color: red\n}\n.background-color[${whiteId}] { background-color: white\n}\n.color[${blueId}] { color: blue\n}`;
    
  //   let cssFileName: string = '';
  //   let cssModules: Record<string, string> = {};
  //   let utilityFileName: string = '';
  //   let utilityModules: Record<string, string> = {};

  //   const getModules = jest.fn((filePath, modules) => {
  //     cssFileName = filePath;
  //     cssModules = modules;
  //   });

  //   const getUtilityModules = jest.fn((filePath, modules) => {
  //     utilityFileName = filePath;
  //     utilityModules = modules;
  //   });

  //   const output = await processCSS(input, {
  //     getModules,
  //     utility: {
  //       mode: 'semireadable',
  //       getUtilityModules,
  //     },
  //   });
    
  //   expect(output).toBe(expectedOutput);
  //   expect(getModules).toHaveBeenCalledTimes(1);
  //   expect(cssFileName).toBe('unknown');
  //   expect(Object.keys(cssModules).length).toBe(2);
  //   expect(cssModules.class1).toBe(`color[${redId}] background-color[${whiteId}]`);
  //   expect(cssModules.class2).toBe(`color[${blueId}]`);
  //   expect(getUtilityModules).toHaveBeenCalledTimes(1);
  //   expect(utilityFileName).toBe('unknown');
  //   expect(Object.keys(utilityModules).length).toBe(3);
  //   expect(utilityModules[`color[${redId}]`]).toBe(`.color[${redId}] { color: red\n}`);
  //   expect(utilityModules[`background-color[${whiteId}]`]).toBe(`.background-color[${whiteId}] { background-color: white\n}`);
  //   expect(utilityModules[`color[${blueId}]`]).toBe(`.color[${blueId}] { color: blue\n}`);
  // });

  // it('should generate coded className utilies correctly even in utilityModules', async () => {
  //   const input = `.class1 { color: red; background-color: white; .class2 { color: blue; } }`;

  //   const redId = getScope('color', 'red');
  //   const whiteId = getScope('background-color', 'white');
  //   const blueId = getScope('color', 'blue');

  //   const expectedOutput = `.${redId} { color: red\n}\n.${whiteId} { background-color: white\n}\n.${blueId} { color: blue\n}`;
    
  //   let cssFileName: string = '';
  //   let cssModules: Record<string, string> = {};
  //   let utilityFileName: string = '';
  //   let utilityModules: Record<string, string> = {};

  //   const getModules = jest.fn((filePath, modules) => {
  //     cssFileName = filePath;
  //     cssModules = modules;
  //   });

  //   const getUtilityModules = jest.fn((filePath, modules) => {
  //     utilityFileName = filePath;
  //     utilityModules = modules;
  //   });

  //   const output = await processCSS(input, {
  //     getModules,
  //     utility: {
  //       mode: 'coded',
  //       getUtilityModules,
  //     },
  //   });
    
  //   expect(output).toBe(expectedOutput);
  //   expect(getModules).toHaveBeenCalledTimes(1);
  //   expect(cssFileName).toBe('unknown');
  //   expect(Object.keys(cssModules).length).toBe(2);
  //   expect(cssModules.class1).toBe(`${redId} ${whiteId}`);
  //   expect(cssModules.class2).toBe(`${blueId}`);
  //   expect(getUtilityModules).toHaveBeenCalledTimes(1);
  //   expect(utilityFileName).toBe('unknown');
  //   expect(Object.keys(utilityModules).length).toBe(3);
  //   expect(utilityModules[`${redId}`]).toBe(`.${redId} { color: red\n}`);
  //   expect(utilityModules[`${whiteId}`]).toBe(`.${whiteId} { background-color: white\n}`);
  //   expect(utilityModules[`${blueId}`]).toBe(`.${blueId} { color: blue\n}`);
  // });

  // it('should generate coded className utilies correctly in utilityModules without output', async () => {
  //   const input = `.class1 { color: red; background-color: white; .class2 { color: blue; } }`;

  //   const redId = getScope('color', 'red');
  //   const whiteId = getScope('background-color', 'white');
  //   const blueId = getScope('color', 'blue');

  //   const expectedOutput = ``;
    
  //   let cssFileName: string = '';
  //   let cssModules: Record<string, string> = {};
  //   let utilityFileName: string = '';
  //   let utilityModules: Record<string, string> = {};

  //   const getModules = jest.fn((filePath, modules) => {
  //     cssFileName = filePath;
  //     cssModules = modules;
  //   });

  //   const getUtilityModules = jest.fn((filePath, modules) => {
  //     utilityFileName = filePath;
  //     utilityModules = modules;
  //   });

  //   const output = await processCSS(input, {
  //     getModules,
  //     utility: {
  //       mode: 'coded',
  //       getUtilityModules,
  //       output: false,
  //     },
  //   });
    
  //   expect(output).toBe(expectedOutput);
  //   expect(getModules).toHaveBeenCalledTimes(1);
  //   expect(cssFileName).toBe('unknown');
  //   expect(Object.keys(cssModules).length).toBe(2);
  //   expect(cssModules.class1).toBe(`${redId} ${whiteId}`);
  //   expect(cssModules.class2).toBe(`${blueId}`);
  //   expect(getUtilityModules).toHaveBeenCalledTimes(1);
  //   expect(utilityFileName).toBe('unknown');
  //   expect(Object.keys(utilityModules).length).toBe(3);
  //   expect(utilityModules[`${redId}`]).toBe(`.${redId} { color: red\n}`);
  //   expect(utilityModules[`${whiteId}`]).toBe(`.${whiteId} { background-color: white\n}`);
  //   expect(utilityModules[`${blueId}`]).toBe(`.${blueId} { color: blue\n}`);
  // });

  // it('should generate scoped classNames and coded className for utilies correctly in utilityModules without output for utility classes.', async () => {
  //   const input = `.class1 { color: red; background-color: white; div { margin: 0; } .class2 { color: blue; } }`;
    
  //   const ID = getScope(input);
  //   const redId = getScope('color', 'red');
  //   const whiteId = getScope('background-color', 'white');
  //   const blueId = getScope('color', 'blue');

  //   const expectedOutput = `.class1${ID} { div { margin: 0; } }`;
    
  //   let cssFileName: string = '';
  //   let cssModules: Record<string, string> = {};
  //   let utilityFileName: string = '';
  //   let utilityModules: Record<string, string> = {};

  //   const getModules = jest.fn((filePath, modules) => {
  //     cssFileName = filePath;
  //     cssModules = modules;
  //   });

  //   const getUtilityModules = jest.fn((filePath, modules) => {
  //     utilityFileName = filePath;
  //     utilityModules = modules;
  //   });

  //   const output = await processCSS(input, {
  //     modules: true,
  //     getModules,
  //     utility: {
  //       mode: 'coded',
  //       getUtilityModules,
  //       output: false,
  //     },
  //   });
    
  //   expect(output).toBe(expectedOutput);
  //   expect(getModules).toHaveBeenCalledTimes(1);
  //   expect(cssFileName).toBe('unknown');
  //   expect(Object.keys(cssModules).length).toBe(2);
  //   expect(cssModules.class1).toBe(`class1${ID} ${redId} ${whiteId}`);
  //   expect(cssModules.class2).toBe(`${blueId}`);
  //   expect(getUtilityModules).toHaveBeenCalledTimes(1);
  //   expect(utilityFileName).toBe('unknown');
  //   expect(Object.keys(utilityModules).length).toBe(3);
  //   expect(utilityModules[`${redId}`]).toBe(`.${redId} { color: red\n}`);
  //   expect(utilityModules[`${whiteId}`]).toBe(`.${whiteId} { background-color: white\n}`);
  //   expect(utilityModules[`${blueId}`]).toBe(`.${blueId} { color: blue\n}`);
  // });

  it('should not generate className utilies for classes already processed.', async () => {
    const input = `.panel { background-color: white; .panel-box { padding: 1em; font-size: 1em; } .panel-header { background-color: grey; .panel-box { padding: 0.5em; } }.panel-footer { background-color: lightgrey; .panel-box { padding: 0.3em; } } }`;

    const expectedOutput = `.panel { .panel-header { .panel-box { padding: 0.5em; } }.panel-footer { .panel-box { padding: 0.3em; } } }`;
    
    let cssFileName: string = '';
    let cssModules: Record<string, string> = {};
    let utilityFileName: string = '';
    let utilityModules: Record<string, string> = {};

    const getModules = jest.fn((filePath, modules) => {
      cssFileName = filePath;
      cssModules = modules;
    });

    const getUtilityModules = jest.fn((filePath, modules) => {
      utilityFileName = filePath;
      utilityModules = modules;
    });

    const output = await processCSS(input, {
      getModules,
      utility: {
        getUtilityModules,
        output: false,
      },
    });
    
    expect(output).toBe(expectedOutput);
    expect(getModules).toHaveBeenCalledTimes(1);
    expect(cssFileName).toBe('unknown');
    expect(Object.keys(cssModules).length).toBe(4);
    expect(cssModules[`panel`]).toBe(`panel background-color[_white]`);
    expect(cssModules[`panel-box`]).toBe(`padding[_1em] font-size[_1em]`);
    expect(cssModules[`panel-header`]).toBe(`panel-header background-color[_grey]`);
    expect(cssModules[`panel-footer`]).toBe(`panel-footer background-color[_lightgrey]`);
    expect(getUtilityModules).toHaveBeenCalledTimes(1);
    expect(utilityFileName).toBe('unknown');
    expect(Object.keys(utilityModules).length).toBe(5);
    expect(utilityModules[`background-color[_white]`]).toBe(`.background-color[_white] { background-color: white\n}`);
    expect(utilityModules[`padding[_1em]`]).toBe(`.padding[_1em] { padding: 1em\n}`);
    expect(utilityModules[`font-size[_1em]`]).toBe(`.font-size[_1em] { font-size: 1em\n}`);
    expect(utilityModules[`background-color[_grey]`]).toBe(`.background-color[_grey] { background-color: grey\n}`);
    expect(utilityModules[`background-color[_lightgrey]`]).toBe(`.background-color[_lightgrey] { background-color: lightgrey\n}`);
  });
});