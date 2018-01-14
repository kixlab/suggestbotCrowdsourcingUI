clear 
close all

% read the video file 
input_video_name = ['NADIA2017_ShortFilm.mp4'];
videoFReader = vision.VideoFileReader(input_video_name, ...
    'AudioOutputPort', true);

% construct file writer objects
segment_num = 1
output_video_name = ['NADIA' sprintf('%02d',segment_num) '.avi']

videoFWriter = vision.VideoFileWriter(output_video_name,'FrameRate',...
    videoFReader.info.VideoFrameRate, 'AudioInputPort', true);

for i=1:50
    [videoFrame, audio] = step(videoFReader);
    step(videoFWriter,videoFrame, audio);
end

release(videoFReader);
release(videoFWriter);
