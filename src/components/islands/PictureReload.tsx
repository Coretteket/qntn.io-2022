import { createSignal, For, type ParentComponent } from 'solid-js';

export type Props = {
  config: {
    widths: number[];
    aspectRatio: number;
    formats: string[];
  };
  data: {
    sources: string[];
    image: string;
  }[];
};

export const PictureReload: ParentComponent<Props> = (props) => {
  const [current, setCurrent] = createSignal(0);
  const picture = () => props.data[current() % props.data.length];
  const next = () => setCurrent(current() + 1);

  const getDims = () => {
    const { aspectRatio, widths } = props.config;
    return { width: widths[0], height: Math.round(widths[0] / aspectRatio) };
  };

  return (
    <div class="mx-auto my-8 max-w-wide">
      <picture>
        <For each={picture().sources}>{(source, i) => <source srcset={source} type={'image/' + props.config.formats[i()]} />}</For>
        <img src={picture().image} {...getDims()} class="my-4 w-full rounded-lg shadow" alt="" />
      </picture>
      <div class="not-prose flex flex-wrap justify-between gap-x-4 text-gray-600 dark:text-gray-400">
        <p>That's me, pretending to code.</p>
        <button class="js-only font-semibold text-sky-600 transition-colors hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-200" onClick={next}>
          Show me another!
        </button>
      </div>
    </div>
  );
};
