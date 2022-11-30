import { createSignal, type ParentComponent } from 'solid-js';

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
    <div class="max-w-wide mx-auto my-8">
      <picture>
        {picture().sources.map((source, i) => (
          <source srcset={source} type={'image/' + props.config.formats[i]} />
        ))}
        <img src={picture().image} {...getDims()} class="w-full my-4 rounded-lg shadow" alt="" />
      </picture>
      <div class="flex flex-wrap justify-between text-gray-600 dark:text-gray-400 gap-x-4 not-prose">
        <p>That's me, pretending to code.</p>
        <button class="font-semibold js-only text-sky-600 transition-colors dark:text-sky-300 hover:text-sky-700 dark:hover:text-sky-200" onClick={next}>
          Show me another!
        </button>
      </div>
    </div>
  );
};
