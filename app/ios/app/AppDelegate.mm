#import "AppDelegate.h"
#import "RNFBAppCheckModule.h"
#import <Firebase.h>
#import <CodePush/CodePush.h>
#import <RNBranch/RNBranch.h>

#import <React/RCTBundleURLProvider.h>

#import <AuthenticationServices/AuthenticationServices.h>
#import <SafariServices/SafariServices.h>
#import <FBSDKCoreKit/FBSDKCoreKit-swift.h>
#import <FBAEMKit/FBAEMKit-Swift.h>


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"socialboat";

  [RNFBAppCheckModule sharedInstance];

  [FIRApp configure];
  [RNBranch.branch checkPasteboardOnInstall];
  [RNBranch initSessionWithLaunchOptions:launchOptions isReferrable:YES];
  NSURL *jsCodeLocation;
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  [[FBSDKApplicationDelegate sharedInstance] application:application
                         didFinishLaunchingWithOptions:launchOptions];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [CodePush bundleURL];
#endif
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    [RNBranch application:app openURL:url options:options];
  
    [FBAEMReporter configureWithNetworker:nil appID:@"1303481443920011" reporter:nil];
    [FBAEMReporter enable];
    [FBAEMReporter handle:url];
  
    if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
      return YES;
    }
    return YES;
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
   [RNBranch continueUserActivity:userActivity];
   return YES;
}

@end
