import * as nunjucks from 'nunjucks';
import dayjs from 'dayjs';
import dashify from 'dashify';
import { TEMPLATES_SRC_DIR, DATE_FORMAT } from './constants';

const nunjucksEnv = nunjucks.configure(TEMPLATES_SRC_DIR, {
  autoescape: true,
});

export interface TemplateData {
  // TODO: figure out how to clean this up, if it's really worth it
  [key: string]: any; // eslint-disable-line
}

nunjucksEnv.addFilter('friendlyDate', (date: string): string => dayjs(date).format(DATE_FORMAT));
nunjucksEnv.addFilter('simpleDate', (date: string): string => dayjs(date).format('YYYY-MM-DD'));
nunjucksEnv.addFilter('tag', (tag: string): string => `/tags/${dashify(tag)}`);

function applyTemplate(templatePath: string, data: TemplateData = {}): string {
  return nunjucksEnv.render(templatePath, data);
}

export default applyTemplate;
