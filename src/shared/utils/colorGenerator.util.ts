export const stringToColor = (str: string) => {
  const colors = [
  "bg-red-900", "bg-yellow-900", "bg-green-900", "bg-blue-900", "bg-indigo-900",
  "bg-purple-900", "bg-pink-900", "bg-rose-900", "bg-orange-900", "bg-amber-900",
  "bg-lime-900", "bg-emerald-900", "bg-teal-900", "bg-cyan-900", "bg-sky-900",
  "bg-violet-900", "bg-fuchsia-900", "bg-gray-900", "bg-stone-900", "bg-zinc-900",
  "bg-neutral-900", "bg-slate-900"
];

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash % colors.length);
  return colors[index];
};
