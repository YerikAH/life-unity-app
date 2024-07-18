// entrega el user o por default es null al igual que el width, height y rounded
export function Image({
  user = null,
  width = "56",
  height = "56",
  rounded = "rounded-full",
  isLoading = true,
  marginy = "my-5",
}) {
  return (
    <>
      {isLoading ? (
          <div className={`flex items-center ${marginy} animate-pulse`}>
            <svg
              className={`w-${width} h-${height} me-3 text-gray-200 dark:text-gray-700 size-full`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
      ) : user?.image ? (
        <img
          className={`object-cover w-${width} h-${height} ${rounded} ${marginy}`}
          src={user?.image}
          alt="avatar"
        />
      ) : (
        <svg
          viewBox="0 0 36 36"
          fill="none"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          className={`${marginy} size-full`}>
          <mask
            id=":r18:"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="36"
            height="36">
            <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
          </mask>
          <g mask="url(#:r18:)">
            <rect width="36" height="36" fill="#4b538b"></rect>
            <rect
              x="0"
              y="0"
              width="36"
              height="36"
              transform="translate(-3 7) rotate(87 18 18) scale(1)"
              fill="#f7a21b"
              rx="36"></rect>
            <g transform="translate(-7 3.5) rotate(-7 18 18)">
              <path d="M13,19 a1,0.75 0 0,0 10,0" fill="#000000"></path>
              <rect
                x="12"
                y="14"
                width="1.5"
                height="2"
                rx="1"
                stroke="none"
                fill="#000000"></rect>
              <rect
                x="22"
                y="14"
                width="1.5"
                height="2"
                rx="1"
                stroke="none"
                fill="#000000"></rect>
            </g>
          </g>
        </svg>
      )}
    </>
  );
}
