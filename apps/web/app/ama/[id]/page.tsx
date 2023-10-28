function AMA(): JSX.Element {
  return (
    <main>
      <h1>AMA</h1>
      <p>Ask me Anything page</p>
      <div className="flex w-full items-center justify-center space-x-2 p-2">
        <input
          className="max-w-sm rounded-lg border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Ask away..."
          type="text"
        />
        <button type="submit">Ask</button>
      </div>
    </main>
  );
}

export default AMA;
