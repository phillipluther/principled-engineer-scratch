import * as nunjucks from 'nunjucks';
import dayjs from 'dayjs';
import dashify from 'dashify';
import { PostMetadata } from './get-post-data';
import { TEMPLATES_SRC_DIR, DATE_FORMAT } from './constants';

const nunjucksEnv = nunjucks.configure(TEMPLATES_SRC_DIR, {
  autoescape: true,
});

nunjucksEnv.addFilter('friendlyDate', (date: string): string => dayjs(date).format(DATE_FORMAT));
nunjucksEnv.addFilter('simpleDate', (date: string): string => dayjs(date).format('YYYY-MM-DD'));
nunjucksEnv.addFilter('tag', (tag: string): string => dashify(tag));

function applyTemplate(templatePath: string, data: PostMetadata): string {
  return nunjucksEnv.render(templatePath, data);
}

export default applyTemplate;