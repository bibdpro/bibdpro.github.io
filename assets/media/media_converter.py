import os
import hashlib
import subprocess
import shutil

def rename_files_to_lowercase_with_dash(directory):
    for filename in os.listdir(directory):
        old_filepath = os.path.join(directory, filename)
        new_filename = filename.lower().replace(' ', '-')
        new_filepath = os.path.join(directory, new_filename + '.mp4')
        os.rename(old_filepath, new_filepath)

def rename_files_to_sha(directory):
    os.chdir(directory)
    files = os.listdir()
    for file in files:
        old_name = os.path.join(directory, file)
        with open(old_name, 'rb') as f:
            data = f.read()
        sha256_hash = hashlib.sha256(data).hexdigest()
        _, extension = os.path.splitext(file)
        new_name = os.path.join(directory, sha256_hash)
        os.rename(old_name, new_name)
    print("File renaming completed.")

def convert_videos_to_images():
    videos_folder = os.path.join(os.getcwd(), "videos")
    poster_folder = os.path.join(os.getcwd(), "poster")

    os.makedirs(poster_folder, exist_ok=True)

    for video_file in os.listdir(videos_folder):
        if video_file.endswith(".mp4"):
            video_path = os.path.join(videos_folder, video_file)
            image_path = os.path.join(poster_folder, os.path.splitext(video_file)[0])

            subprocess.run(["ffmpeg", "-i", video_path, "-ss", "00:00:10", "-vframes", "1", f"{image_path}.jpg"])

            new_video_name = os.path.join(videos_folder, os.path.splitext(video_file)[0])
            os.rename(video_path, new_video_name)

            if os.path.exists(f"{image_path}.jpg"):
                shutil.move(f"{image_path}.jpg", image_path)

if __name__ == "__main__":
    choice = input("Choose an option:\n1. Rename files to lowercase with dash\n2. Rename files to SHA\n3. Convert videos to poster\nEnter choice (1/2/3): ")

    if choice == "1":
        input_directory = input("Enter directory path: ")
        rename_files_to_lowercase_with_dash(input_directory)
        print("File names have been updated according to the naming convention:", input_directory)
    elif choice == "2":
        directory = '/storage/emulated/0/BIBDpro/assets/media/images'
        rename_files_to_sha(directory)
    elif choice == "3":
        print("Starting conversion...")
        convert_videos_to_images()
        print("Conversion completed successfully!")
    else:
        print("Invalid choice.")
