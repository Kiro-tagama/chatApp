import { Toast, VStack, ToastTitle, ToastDescription} from '@gluestack-ui/themed';

interface PropsToast{
  id: string
  type: "info"|"success"|"warning"|"error"|"attention"
  message: string
}

export function MyToast({id,type,message}:PropsToast) {
  const toastActions = {
    info:{
      actionType: "info",
      title: "Info",
    },
    success:{
      actionType: "success",
      title: "Success!",
    },
    warning:{
      actionType: "warning",
      title: "Warning!",
    },
    error:{
      actionType: "error",
      title: "Error!",
    },
    attention:{
      actionType: "attention",
      title: "Attention!",
    },
  }
  return (
    <Toast nativeID={"toast-" + id} variant="accent" marginTop={"50%"}  
    action={toastActions[type].actionType || "attention"}>
      <VStack space="xs">
        <ToastTitle>{toastActions[type].actionType}</ToastTitle>
        <ToastDescription >{message}</ToastDescription>
      </VStack>
    </Toast>
  );
};
