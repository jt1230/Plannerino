import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import authState from "atoms/authState";

export default function activeUser(url){
	const auth = useRecoilValue(authState);
	const router = useRouter();	
	
	useEffect(() => {
		if(auth != null){
		  router.push(url);
		}
		else router.push("/");
	
	  }, [auth]);
	
}
