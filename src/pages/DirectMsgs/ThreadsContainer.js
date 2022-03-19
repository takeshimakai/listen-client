import { useState, useEffect } from 'react';

import Inbox from "./Inbox";
import Sent from "./Sent";

const ThreadsContainer = ({ page, threads }) => {
  const [isEmpty, setIsEmpty] = useState();

  useEffect(() => {
    const target = document.querySelector('#threads-container');

    if (target.childElementCount === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          if (target.childElementCount === 0) {
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
          }
        }
      })
    });

    observer.observe(target, { childList: true });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div id='threads-container' className='space-y-4'>
        {page === 'inbox' && <Inbox threads={threads} />}
        {page === 'sent' && <Sent threads={threads} />}
      </div>
      {isEmpty && <p className='font-light sm:text-sm'>There are no messages to display.</p>}
    </>
  )
}

export default ThreadsContainer;