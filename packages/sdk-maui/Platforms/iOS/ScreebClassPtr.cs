// packages/sdk-maui/Platforms/iOS/ScreebClassPtr.cs
// Supplies the missing class_ptr for the bgen-generated static partial class.
// bgen emits `static partial class Screeb` that references class_ptr but does
// not initialize it for [Static] interfaces — we complete the partial here.
using ObjCRuntime;

namespace Screeb.iOS.Binding
{
    public static unsafe partial class Screeb
    {
        static readonly NativeHandle class_ptr = Class.GetHandle("Screeb");
    }

    public static unsafe partial class ScreebView
    {
        static readonly NativeHandle class_ptr = Class.GetHandle("ScreebView");
    }
}
