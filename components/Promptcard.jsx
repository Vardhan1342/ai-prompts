import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Promptcard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router=useRouter()
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  const handleProfile=()=>{
    if(post.creator._id===session?.user.id)
    {
      return router.push("/profile")
    }
    router.push(`/profile/${post.creator.username}?id=${post.creator._id}`)
  }

  return (
    <div className="prompt_card shadow-lg space-y-2">
      <div className="flex  gap-2 cursor-pointer" onClick={handleProfile}>
        <Image
          src={post.creator.image}
          alt="user_image"
          width={30}
          height={30}
          className="rounded-full object-contain"
        />
        <div className="flex flex-col">
          <div className="flex gap-2">
            <h1 className="font-satoshi font-semibold text-gray-800">
              {post.creator.username}
            </h1>
            <Image
              src={
                copied === post.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              width={15}
              height={15}
              onClick={handleCopy}
              alt="copy"
            />
          </div>
          <p className="font-inter text-sm text-gray-500">
            {post.creator.email}
          </p>
        </div>
      </div>
      <div>
        <p className="my-4 font-satoshi text-sm text-gray-700 tracking-wide">
          {post.prompt}
        </p>
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => {
            handleTagClick && handleTagClick(post.tag);
          }}
        >
          #{post.tag}
        </p>
      </div>
      <div className="">
        {session?.user.id === post.creator._id && pathName === "/profile" && (
          <div className="flex gap-4 justify-end font-inter text-sm text-orange-400  cursor-pointer">
            <p className=" hover:text-orange-300" onClick={handleEdit}>
              Edit
            </p>
            <p className=" hover:text-orange-300" onClick={handleDelete}>
              Delete
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Promptcard;
