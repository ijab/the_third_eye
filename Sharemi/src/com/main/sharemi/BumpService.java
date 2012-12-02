package com.main.sharemi;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaInterface;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.os.RemoteException;
import android.os.StrictMode;
import android.util.Log;

import com.bump.api.BumpAPIIntents;
import com.bump.api.IBumpAPI;



public class BumpService extends CordovaPlugin {
	
	private IBumpAPI api;
	private boolean findMatch=false;
	private int Max_Attempt=200;
	private String matcheduser="";
	private String username="";
	private boolean isRunning=false;
	private boolean isReady=false;
	
	
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        MainActivity.instance.initBump(connection,receiver);
    }
	
	

    public final ServiceConnection connection = new ServiceConnection() {
   
			@SuppressLint("NewApi")
			public void onServiceConnected(ComponentName className, IBinder binder) {
	            Log.i("BumpService", "onServiceConnected");
	            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
	            StrictMode.setThreadPolicy(policy); 
	            if(api==null){
		            api = IBumpAPI.Stub.asInterface(binder);
		            try {
		                api.configure("91e05c590462414dba1bfc6dc82cdef3",
		                              "Xun Xu");
		            } catch (RemoteException e) {
		                Log.w("BumpService", e);
		            }
	            }
	            Log.d("BumpService", "Service connected");
	
	        }

   
        	public void onServiceDisconnected(ComponentName className) {
            Log.d("BumpService", "Service disconnected");
	        }
	    };
	

	public final BroadcastReceiver receiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            final String action = intent.getAction();
            try {
                if (action.equals(BumpAPIIntents.DATA_RECEIVED)) {
                    Log.i("BumpService", "Received data from: " + api.userIDForChannelID(intent.getLongExtra("channelID", 0))); 
                    Log.i("BumpService", "Data: " + new String(intent.getByteArrayExtra("data")));
                    matcheduser=new String(intent.getByteArrayExtra("data"));
                    findMatch=true;
                } else if (action.equals(BumpAPIIntents.MATCHED)) {
                    long channelID = intent.getLongExtra("proposedChannelID", 0); 
                    Log.i("BumpService", "Matched with: " + api.userIDForChannelID(channelID));
                    api.confirm(channelID, true);
                    Log.i("BumpService", "Confirm sent");
                } else if (action.equals(BumpAPIIntents.CHANNEL_CONFIRMED)) {
                    long channelID = intent.getLongExtra("channelID", 0);
                    Log.i("BumpService", "Channel confirmed with " + api.userIDForChannelID(channelID));
                    api.send(channelID, username.getBytes());
                } else if (action.equals(BumpAPIIntents.NOT_MATCHED)) {
                    Log.i("BumpService", "Not matched.");
                } else if (action.equals(BumpAPIIntents.CONNECTED)) {
                    Log.i("BumpService", "Connected to Bump...");
                    api.enableBumping();
                    isReady = true;
                    isRunning=true;
                }
            } catch (RemoteException e) {}
        } 
    };
    
	
	public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
		username=args.getString(0);
	    if ("Action1".equals(action)) {
	        new Thread(new Runnable() {
	            public void run() {
	            	//MainActivity.instance.startListening(connection, receiver); 
	            	while(!isReady){
	            		try {
							Thread.sleep(100);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
	            	}
	            	if(!isRunning){
	            		try {
							api.enableBumping();
						} catch (RemoteException e) {
							e.printStackTrace();
						}
	            		isRunning=true;
	            	}
	            	int attempt=0;
	            	while(!findMatch){
	            		try {
							Thread.sleep(100);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
	            		attempt++;
	            		if(attempt>Max_Attempt){
	            			callbackContext.error("Time out for finding match for "+username);
	            			break;
	            		}
	            	}
	            	if(findMatch){
	            		callbackContext.success("FindMatch:"+matcheduser); 
	            		findMatch=false;
	            		matcheduser="";
	            	}
	            	try {
						api.disableBumping();
						isRunning=false;
					} catch (RemoteException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
	            	//MainActivity.instance.endListening(connection, receiver);
	            }
	        }).start();
	        return true;
	    }
	    return false;
	}

}
