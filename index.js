// Fetch the JSON file
async function getVideoData() {
  const response = await fetch("http://127.0.0.1:8080/video_data.json");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await response.json();
  return data;
}

function generateVideoContainer(video_data) {
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video-container"); // Adding the video-container class for css

  const thumbnail = document.createElement("img");
  thumbnail.src = video_data.thumbnail_src;
  videoContainer.appendChild(thumbnail);

  const videoLength = document.createElement("span");
  videoLength.textContent = video_data.video_length;
  videoContainer.appendChild(videoLength);

  // ------------- creating metadata -------------
  const videoMetadata = document.createElement("div");
  videoMetadata.classList.add("video-metadata"); // Adding the video-container class for css

  const channelImg = document.createElement("img");
  channelImg.src = video_data.channel_profile_pic_src;
  channelImg.width = 38;
  videoMetadata.appendChild(channelImg);

  const div = document.createElement("div");

  const title = document.createElement("h4");
  title.textContent = video_data.title;
  const channelName = document.createElement("p");
  channelName.textContent = video_data.channel_name;
  const released = document.createElement("p");
  released.textContent = video_data.released;

  div.appendChild(title);
  div.appendChild(channelName);
  div.appendChild(released);

  videoMetadata.appendChild(div);

  // ------------- creating metadata ------------- //

  videoContainer.appendChild(videoMetadata);

  return videoContainer;
}

async function load_videos() {
  const videos = document.querySelector(".videos");

  const video_data_arr = await getVideoData();
  console.log(video_data_arr);

  const video_containers = video_data_arr.map((video_data) =>
    generateVideoContainer(video_data),
  );
  video_containers.forEach((video_container) => {
    videos.appendChild(video_container);
  });
}

load_videos();
